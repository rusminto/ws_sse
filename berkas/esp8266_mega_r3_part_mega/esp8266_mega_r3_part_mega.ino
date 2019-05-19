#include <dht.h>
#include <Servo.h>
#define dht_apin 7

float value = 1;
long lastMsg = 0;
char msg[50];
int led = 0;
int servo_pos[] = {0};

dht DHT;
Servo door , garagedoor;

void setup() {
  Serial.begin(115200);
  pinMode(2, OUTPUT);
  digitalWrite(2, LOW);
  pinMode(3, OUTPUT);
  digitalWrite(3, LOW);
  pinMode(30, OUTPUT);
  digitalWrite(30, LOW);
  pinMode(31, OUTPUT);
  digitalWrite(31, LOW);
  pinMode(32, OUTPUT);
  digitalWrite(32, LOW);
  pinMode(33, OUTPUT);
  digitalWrite(33, LOW);
  pinMode(34, OUTPUT);
  digitalWrite(34, LOW);
  pinMode(35, OUTPUT);
  digitalWrite(35, LOW);
  pinMode(36, OUTPUT);
  digitalWrite(36, LOW);
  pinMode(37, OUTPUT);
  digitalWrite(37, LOW);
  pinMode(38, OUTPUT);
  digitalWrite(38, LOW);
  pinMode(39, OUTPUT);
  digitalWrite(39, LOW);
  pinMode(40, OUTPUT);
  digitalWrite(40, LOW);
  garagedoor.attach(34);
  door.attach(35);
}

void loop() {
  long now = millis();
  if (now - lastMsg > 10000) {
    lastMsg = now;
    DHT.read11(dht_apin);
    String temp = "kitchen :"+String(DHT.temperature);
    //    ++value;
    //    snprintf (msg, 75, "%ld", value);
    Serial.println(temp);
  }

  while (Serial.available() > 0) {
    String str = Serial.readString(); // read the incoming data as string
    //        Serial.println(str);
    //    if (str.substring(0) == "0\r\n") {

    //ruangan dan perangkat
    if (str.substring(4, 6) == "1;") { //bedroom1
      if (str.substring(2, 4) == "1;") { //lamp
      led_state(2, str);
      }
      
    } else if (str.substring(4, 6) == "2;") { //bedroom
      if (str.substring(2, 4) == "1;") { //lamp
      led_state(3, str);
      }
          
    } else if (str.substring(4, 6) == "3;") { //kitchen
      if (str.substring(2, 4) == "1;") { //lamp
        led_state(30, str);
     // } else if (str.substring(2, 4) == "2;") { //fan
        //fan_state(7, str);
      } else if (str.substring(2, 4) == "0;") { //device
        fan_state(30, str);
        //led_state(11, str);
      }

    } else if (str.substring(4, 6) == "4;") { //dinning room
      if (str.substring(2, 4) == "1;") { //lamp
      led_state(31, str);  
      }

    } else if (str.substring(4, 6) == "5;") { //terrace
      if (str.substring(2, 4) == "1;") { //lamp
      led_state(37, str); 
      }

    } else if (str.substring(4, 6) == "6;") { //guest room
      if (str.substring(2, 4) == "1;") { //lamp
      led_state(32, str); 
      }

    } else if (str.substring(4, 6) == "7;") { //living room
      if (str.substring(2, 4) == "1;") { //lamp
      fan_state(30, str);    
      }   
      
    } else if (str.substring(4, 6) == "8;") { //Prayer room
      if (str.substring(2, 4) == "1;") { //lamp
      led_state(33, str); 
      }
      
    } else if (str.substring(4, 6) == "9;") { //First Bathroom
      if (str.substring(2, 4) == "1;") { //lamp
      led_state(39, str); 
      }

    } else if (str.substring(4, 6) == "10;") { //Second Bathroom
      if (str.substring(2, 4) == "1;") { //lamp
      led_state(38, str);
      }
      
    } else if (str.substring(4, 6) == "11;") { //washing room
      if (str.substring(2, 4) == "1;") { //lamp
      led_state(40, str);  
      }
          
    } else if (str.substring(4, 6) == "13;") { //Garage
      if (str.substring(2, 4) == "1;") { //lamp
      led_state(36, str); 
      }
          
    } else if (str.substring(4, 6) == "0;") { //house/home
      if (str.substring(2, 4) == "1;") { //lamp
        led_state(2, str);
        led_state(3, str);
        led_state(30, str);
        led_state(31, str);
        led_state(37, str); 
        led_state(32, str);
        led_state(33, str);
        led_state(39, str); 
        led_state(38, str);
        led_state(40, str); 
        led_state(36, str); 
      } else if (str.substring(2, 4) == "2;") { //fan
        fan_state(30, str);
      } else if (str.substring(2, 4) == "0;") { //device
        led_state(2, str);
        led_state(3, str);
        led_state(30, str);
        led_state(31, str);
        led_state(37, str); 
        led_state(32, str);
        led_state(33, str);
        led_state(39, str); 
        led_state(38, str);
        led_state(40, str); 
        led_state(36, str); 
        fan_state(30, str);
      }
    }
    if (str.substring(2, 4) == "3;") { //my door
      servo_state(door, 0, str);

    } else if (str.substring(2, 4) == "4;") { //garage door
      servo_state(garagedoor, 0, str);  
    }
  }
}
//status yang diinginkan
void led_state(int led, String str) {
  if (str.substring(0, 2) == "0;") { //off
    digitalWrite(led, LOW);
  } else if (str.substring(0, 2) == "1;") { //low
    analogWrite(led, 5);
  } else if (str.substring(0, 2) == "2;") { //medium
    analogWrite(led, 65);
  } else if (str.substring(0, 2) == "3;") { //high
    analogWrite(led, 255);
  } else if (str.substring(0, 2) == "4;") { //on
    digitalWrite(led, HIGH);
  }
}

void fan_state(int led, String str) {
  if (str.substring(0, 2) == "0;") { //off
    digitalWrite(led, LOW);
  } else if (str.substring(0, 2) == "1;") { //low
    analogWrite(led, 165);
  } else if (str.substring(0, 2) == "2;") { //medium
    analogWrite(led, 200);
  } else if (str.substring(0, 2) == "3;") { //high
    analogWrite(led, 255);
  } else if (str.substring(0, 2) == "4;") { //on
    digitalWrite(led, HIGH);
  }
}

void servo_state(Servo servo, int id, String str) {
  int pos = servo_pos[id];
  if (str.substring(0, 2) == "5;") { //open
    //    if (pos == 0)
    for (pos = 0; pos <= 90; pos += 1) {
      servo.write(pos);
      delay(15);
    }

  } else if (str.substring(0, 2) == "6;") { //close
    //    if (pos == 90)
    for (pos = 90; pos >= 0; pos -= 1) {
      servo.write(pos);
      delay(15);
    }
  }
  servo_pos[id] = pos;
}
