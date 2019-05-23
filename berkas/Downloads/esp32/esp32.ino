#include <WiFi.h>
#include <PubSubClient.h>
#include <dht.h>
#include <Servo.h>
#define dht_apin 5

// Update these with values suitable for your network.
//const char* ssid = "smart1";
//const char* password = "home1234";
//const char* mqtt_server_pil1 = "192.168.43.19";
//const char* mqtt_server_pil2 = "192.168.43.20";

const char* ssid = "Andromax-M2Y-350C";
const char* password = "rumah123LoL";
const char* mqtt_server_pil1 = "192.168.100.223";
const char* mqtt_server_pil2 = "192.168.100.222";

//const char* ssid = "UGM-Hotspot";
//const char* password = "";
//const char* mqtt_server_pil1 = "10.73.2.105";
//const char* mqtt_server_pil2 = "10.73.2.106";

//char* ssid = "WIFI KOST";
//char* password = "ojolalisholat";
//const char* mqtt_server_pil1 = "192.168.1.222";
//const char* mqtt_server_pil2 = "192.168.1.223";

//const char* ssid = "BLep";
//const char* password = "cieciecie";
//const char* mqtt_server = "192.168.43.245";

//int freq = 5000;
int ledChannel = 1;
int fanChannel = 2;
//int resolution = 8;
int pos = 0;
int counterFailed = 0;
int switcher = 1;

dht mydht;

WiFiClient espClient;
PubSubClient client(espClient);
long lastMsg = 0;
char msg[50];
int value = 0;

const int ledPin = 23;  // 23 corresponds to GPIO16
const int fanPin = 4;
int readValue;
int writeValue;


void setup() {
  pinMode(ledPin, OUTPUT);
  digitalWrite(ledPin, LOW);
  pinMode(fanPin, OUTPUT);
  digitalWrite(fanPin, LOW);
  // configure LED PWM functionalitites
  ledcSetup(1, 12000, 8);
  ledcSetup(2, 12000, 8);
  //  ledcSetup(ledChannel, freq, resolution);
  // attach the channel to the GPIO to be controlled
  ledcAttachPin(ledPin, ledChannel);
  ledcAttachPin(fanPin, fanChannel);
  Serial.begin(115200);
  setup_wifi();
  client.setServer(mqtt_server_pil1, 1883);
  client.setCallback(callback);
}

void setup_wifi() {

  delay(10);
  // We start by connecting to a WiFi network
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(WiFi.gatewayIP());
    Serial.println();
    delay(500);
    //    Serial.print(".");
  }

  randomSeed(micros());

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}

void reconnect() {
  // Loop until we're reconnected
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    // Create a random client ID
    if (client.connect("ESP32")) {
      if (switcher == 1) {
        Serial.print("connected to ");
        Serial.println(mqtt_server_pil1);
      } else {
        Serial.print("connected to ");
        Serial.println(mqtt_server_pil2);
      }
      // Once connected, publish an announcement...
      client.subscribe("server-arduino");
      client.subscribe("failover");
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      // Wait 5 seconds before retrying
      delay(3000);
      if (client.state() == -2 ) {
        counterFailed = counterFailed + 1;
        if (counterFailed > 6) {
          switch (switcher) {
            case 1:
              client.disconnect();
              client.setServer(mqtt_server_pil2, 1883);
              switcher = 2;
              break;

            case 2:
              client.disconnect();
              client.setServer(mqtt_server_pil1, 1883);
              switcher = 1;
              break;
          }
          counterFailed = 0;
        }
      }
    }
  }
}

void callback(char* topic, byte* payload, unsigned int length) {
  //  Serial.print("Message arrived [");
  //  Serial.print(topic);
  //  Serial.print("] ");
  String str;
  for (int i = 0; i < length; i++) {
    str += (char)payload[i];
  } Serial.println();
  for (int i = 0; i < length; i++) {
    Serial.print((char)payload[i]);
  }
  if (strcmp(topic, "failover") == 0){
  if (str == "Hidup") {
      client.disconnect();
      client.setServer(mqtt_server_pil1, 1883);
      switcher = 1;
    }
    //Serial.println("Broker Pindah ke 1");
  }
  Serial.println(topic);
  
  Serial.println();
  Serial.println(str);
  if (str.substring(4, 7) == "12;") { //backyard
  if (str.substring(2, 4) == "1;") { //lamp
      led_state(ledChannel, str);
    }
  }
  else if (str.substring(4, 6) == "0;") { //home/house
  if (str.substring(2, 4) == "0;") { //devices
      led_state(ledChannel, str);
      fan_state(fanChannel, str);
    } else if (str.substring(2, 4) == "1;") { //lamp
      led_state(ledChannel, str);
    } else if (str.substring(2, 4) == "2;") { //fan
      fan_state(fanChannel, str);
    }
  }
  else if (str.substring(4, 6) == "7;") { //livingroom
  if (str.substring(2, 4) == "2;") { //fan
      fan_state(fanChannel, str);
    }
  }
}
void loop() {

  if (!client.connected()) {
    reconnect();
  }
  client.loop();

  long now = millis();
  if (now - lastMsg > 6000) {
    lastMsg = now;
    mydht.read11(dht_apin);
    String temp = "kitchen : " + String(mydht.temperature) + ";" + String(mydht.humidity);
    temp.toCharArray(msg, temp.length() + 1);
    client.publish("arduino-server", msg);
  }
}

//status yang diinginkan
void led_state(int ledChannel, String str) {
  if (str.substring(0, 2) == "0;") { //off
    ledcWrite(ledChannel, 0);
  } else if (str.substring(0, 2) == "1;") { //low
    ledcWrite(ledChannel, 5);
  } else if (str.substring(0, 2) == "2;") { //medium
    ledcWrite(ledChannel, 65);
  } else if (str.substring(0, 2) == "3;") { //high
    ledcWrite(ledChannel, 255);
  } else if (str.substring(0, 2) == "4;") { //on
    ledcWrite(ledChannel, 255);
  }
}

void fan_state(int fanChannel, String str) {
  if (str.substring(0, 2) == "0;") { //off
    ledcWrite(fanChannel, 0);
  } else if (str.substring(0, 2) == "1;") { //low
    ledcWrite(fanChannel, 120);
  } else if (str.substring(0, 2) == "2;") { //medium
    ledcWrite(fanChannel, 160);
  } else if (str.substring(0, 2) == "3;") { //high
    ledcWrite(fanChannel, 255);
  } else if (str.substring(0, 2) == "4;") { //on
    ledcWrite(fanChannel, 255);
  }
}
