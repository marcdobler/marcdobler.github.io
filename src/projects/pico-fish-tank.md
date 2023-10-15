---
layout: posts
title: "Make an IoT device for Reef Tank"
excerpt: After a restart inside reef tank 
tags:
    - DIY
    - Reef tank
color: green
author:
- Marc Dobler
date: 2020-04-20
---

## Introduction

Maintaining the delicate balance of a reef tank is a challenging but rewarding task. In this project, we explore the creation of an IoT device designed to monitor various crucial parameters within the reef tank environment, ensuring the well-being of its inhabitants.

## Presentation

This project requires a combination of specialized hardware and software to effectively track and manage the conditions inside the reef tank. 

### Embedded Software

- Utilize the versatile and powerful [Flutter](https://flutter.dev/) framework, incorporating [flutter-pi](https://github.com/ardera/flutter-pi) for seamless integration within the device.

### Hardware Components

- Implement an ESP32 or ESP8266 microcontroller to facilitate data collection and processing.
- Employ sensors such as the DS18B20 for temperature monitoring, a pH sensor for acidity levels, and an ORP sensor for oxidation-reduction potential.
- Utilize the Pomorini OLED touch screen for user-friendly interaction with the device.
- Integrate a Raspberry Pi for enhanced computational capabilities and data management.

## Resources

### Getting Started

This project serves as an excellent starting point for developing a sophisticated Flutter embedded application. If you're new to Flutter development, consider the following resources:

- [Lab: Write your first Flutter app](https://flutter.dev/docs/get-started/codelab)
- [Cookbook: Useful Flutter samples](https://flutter.dev/docs/cookbook)
- Explore the [Flutter-pi](https://github.com/ardera/flutter-pi) repository for insights into leveraging Flutter in embedded systems.

For comprehensive guidance on Flutter development, refer to the [online documentation](https://flutter.dev/docs), which includes tutorials, samples, and API references.

## Contributing

We welcome contributions to this project. Please review our [CONTRIBUTING.md](https://github.com/marcdobler/smart_reef/blob/master/CONTRIBUTING.md) for a detailed understanding of our code of conduct and the process for submitting pull requests.

## Authors

* **Marc Dobler** - *Initial work* - [marcdobler](https://github.com/marcdobler)

## License

This project is licensed under the GPL-3.0 License. Refer to the [LICENSE.md](https://github.com/marcdobler/smart_reef/blob/master/LICENSE.md) file for comprehensive details on the license terms and conditions.
