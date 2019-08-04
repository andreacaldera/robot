import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  WebView
} from "react-native";
import * as superagent from "superagent";

const BASE_API_URL = "http://192.168.1.109:4001/api/";
// const BASE_API_URL = "http://localhost:4001/api/";

const BUTTON = {
  backgroundColor: "#ddd",
  padding: 15,
  borderRadius: 3,
  marginTop: 10,
  width: "100%"
};

const styles = StyleSheet.create({
  mainContainer: {
    padding: 20,
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "#eee",
    alignItems: "center"
  },
  btnText: {
    fontSize: 15
  },
  btn: {
    ...BUTTON,
    flexDirection: "row",
    justifyContent: "center"
  },
  buttonInRow: {
    backgroundColor: "#ddd",
    padding: 15,
    borderRadius: 3,
    marginTop: 10,
    width: 300,
    flexDirection: "row",
    justifyContent: "center",
    flex: 1 / 3
  },
  btnTextDanger: {
    fontSize: 15,
    color: "#721c24"
  },
  btnDanger: {
    ...BUTTON,
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#f8d7da"
  },
  separator: {
    marginLeft: 10
  }
});

const apiGet = async (path: string) =>
  superagent
    .get(`${BASE_API_URL}${path}`)
    .set("Accept", "application/json")
    .timeout({ response: 9000, deadline: 10000 })
    .then(({ body }) => body);

const apiPost = async (path: string, payload?: any) =>
  superagent
    .post(`${BASE_API_URL}${path}`)
    .set("Accept", "application/json")
    .send(payload)
    .timeout({ response: 9000, deadline: 10000 })
    .then(({ body }) => body)
    .catch(error => {
      console.error("error", error);
    });

const getMedianSpeed = ({ leftMotorSpeed, rightMotorSpeed }) => {
  if (leftMotorSpeed <= 0 && rightMotorSpeed <= 0) {
    return (Math.abs(leftMotorSpeed) + Math.abs(rightMotorSpeed)) / -2;
  }

  if (leftMotorSpeed >= 0 && rightMotorSpeed >= 0) {
    return (Math.abs(leftMotorSpeed) + Math.abs(rightMotorSpeed)) / 2;
  }

  if (leftMotorSpeed < 0) {
    return (leftMotorSpeed + rightMotorSpeed) / -2;
  }

  if (rightMotorSpeed < 0) {
    return (leftMotorSpeed + rightMotorSpeed) / -2;
  }

  return 0;
};

export default function App() {
  const [motorsSpeed, setMotorsSpeed] = useState({
    leftMotorSpeed: 0,
    rightMotorSpeed: 0
  });
  useEffect(() => {
    apiGet("motors-speed").then(motorsSpeed => {
      setMotorsSpeed(motorsSpeed);
    });
  }, []);

  const turnLeft = () => {
    apiPost("set-motors", {
      leftMotorSpeed: motorsSpeed.leftMotorSpeed - 5,
      rightMotorSpeed: motorsSpeed.rightMotorSpeed + 5
    }).then(setMotorsSpeed);
  };

  const turnRight = () => {
    apiPost("set-motors", {
      leftMotorSpeed: motorsSpeed.leftMotorSpeed + 5,
      rightMotorSpeed: motorsSpeed.rightMotorSpeed - 5
    }).then(setMotorsSpeed);
  };

  const speedUp = () => {
    apiPost("set-motors", {
      leftMotorSpeed: motorsSpeed.leftMotorSpeed + 10,
      rightMotorSpeed: motorsSpeed.rightMotorSpeed + 10
    }).then(setMotorsSpeed);
  };

  const speedDown = () => {
    apiPost("set-motors", {
      leftMotorSpeed: motorsSpeed.leftMotorSpeed - 10,
      rightMotorSpeed: motorsSpeed.rightMotorSpeed - 10
    }).then(setMotorsSpeed);
  };

  const goStraight = () => {
    const speed = getMedianSpeed(motorsSpeed);
    apiPost("set-motors", {
      leftMotorSpeed: speed,
      rightMotorSpeed: speed
    }).then(setMotorsSpeed);
  };

  const resetMotors = () => apiPost("reset-motors").then(setMotorsSpeed);

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.btnText}>Welcome to Abune Shiatzu controls</Text>

      <Text>
        Motors data:{" "}
        {`${motorsSpeed.leftMotorSpeed} | ${motorsSpeed.rightMotorSpeed}`}
      </Text>
      <TouchableOpacity onPress={speedUp} style={styles.btn}>
        <Text style={styles.btnText}>Speed up</Text>
      </TouchableOpacity>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity onPress={turnLeft} style={styles.buttonInRow}>
          <Text style={styles.btnText}>Left</Text>
        </TouchableOpacity>
        <View style={styles.separator} />
        <TouchableOpacity onPress={goStraight} style={styles.buttonInRow}>
          <Text style={styles.btnText}>Straight</Text>
        </TouchableOpacity>
        <View style={styles.separator} />
        <TouchableOpacity onPress={turnRight} style={styles.buttonInRow}>
          <Text style={styles.btnText}>Right</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={speedDown} style={styles.btn}>
        <Text style={styles.btnText}>Speed down</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={resetMotors} style={styles.btnDanger}>
        <Text style={styles.btnTextDanger}>Stop</Text>
      </TouchableOpacity>
    </View>
  );
}
