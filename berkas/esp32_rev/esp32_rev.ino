#include <WiFi.h>
#include <PubSubClient.h>
#include <dht.h>
#include <Servo.h>
#define dht_apin 5

// Update these with values suitable for your network.

//const char* ssid = "Andromax-M2Y-350C";
//const char* password = "rumah123LoL";
//const char* mqtt_server = "192.168.100.11";

//const char* ssid = "WIFI KOST";
//const char* password = "ojolalisholat";
//const char* mqtt_server = "192.168.1.171";

const char* ssid = "BLep";
const char* password = "cieciecie";
const char* mqtt_server = "192.168.43.245";

int freq = 5000;
int ledChannel = 0;
int resolution = 8;
int servo_pos[] = {0};

dht mydht;
Servo fanswing;

WiFiClient espClient;
PubSubClient client(espClient);
long lastMsg = 0;
char msg[50];
int value = 0;

const int ledPin = 23;  // 16 corresponds to GPIO16
int readValue;
int writeValue;

void setup() {
  pinMode(23, OUTPUT);
  digitalWrite(23, LOW);
  fanswing.attach(34);
  // configure LED PWM functionalitites
  //  ledcSetup(1, 12000, 8);
  ledcSetup(ledChannel, freq, resolution);
  // attach the channel to the GPIO to be controlled
  ledcAttachPin(ledPin, ledChannel);
  Serial.begin(115200);
  setup_wifi();
  client.setServer(mqtt_server, 1883);
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
    delay(500);
    Serial.print(".");
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
      Serial.println("connected");
      // Once connected, publish an announcement...
      client.subscribe("smarthome");
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      // Wait 5 seconds before retrying
      delay(5000);
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
  }
  if (str.substring(4, 6) == "12;") { //backyard
    if (str.substring(2, 4) == "1;") { //lamp
      led_state(23, str);
    }
  }

  if (str.substring(4, 6) == "7;") { //livingroom
    if (str.substring(2, 4) == "2;") { //fan
      servo_state(fanswing, 0);
    }
  }
}

void loop() {

  if (!client.connected()) {
    reconnect();
  }
  client.loop();

  long now = millis();
  if (now - lastMsg > 2000) {
    lastMsg = now;
    mydht.read11(dht_apin);
    String temp = "kitchen : " + String(mydht.temperature);
    temp.toCharArray(msg, temp.length() + 1);
    client.publish("smarthome", msg);
  }
}

//status yang diinginkan
void led_state(int led, String str) {
  if (str.substring(0, 2) == "0;") { //off
    digitalWrite(led, LOW);
  } else if (str.substring(0, 2) == "1;") { //low
    ledcWrite(led, 5);
  } else if (str.substring(0, 2) == "2;") { //medium
    ledcWrite(led, 65);
  } else if (str.substring(0, 2) == "3;") { //high
    ledcWrite(led, 255);
  } else if (str.substring(0, 2) == "4;") { //on
    digitalWrite(led, HIGH);
  }
}

void fan_state(int led, String str) {
  if (str.substring(0, 2) == "0;") { //off
    digitalWrite(led, LOW);
  } else if (str.substring(0, 2) == "1;") { //low
    ledcWrite(led, 165);
  } else if (str.substring(0, 2) == "2;") { //medium
    ledcWrite(led, 200);
  } else if (str.substring(0, 2) == "3;") { //high
    ledcWrite(led, 255);
  } else if (str.substring(0, 2) == "4;") { //on
    digitalWrite(led, HIGH);
  }
}

void servo_state(Servo servo, id) {
  int posi = servo_pos[id];
  if (str.substring(0, 2) == "0;") { //off
    servo.write(pos);
  } else if (str.substring(0, 2) == "4;") { //low
    for (int pos = 0; pos <= 90; pos += 1) {
      servo.write(pos);
      delay(15);
    }
    for (int pos = 90; pos >= 0; pos -= 1) {
      servo.write(pos);
      delay(15);
    }
  }
  servo_pos[id] = posi;
}
