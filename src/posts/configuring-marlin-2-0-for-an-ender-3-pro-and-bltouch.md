---
layout: posts
title: "How to Configure Marlin 2.0 for an Ender 3 / Pro and BLTouch"
excerpt: A comprehensive guide to configuring Marlin firmware for the Ender 3 / Pro 3D printer with BLTouch. Learn the essentials and advanced tips for a customized setup.
tags: 
    - 3D Printer
    - Ender
color: bluegrey
image: "/assets/images/ender-3-pro-desktop-1536x1152.jpg"
image-desc: "Personal desktop with Ender 3 Pro 3D printer"
author:
- Marc Dobler
meta: "Z-Offset for 3D printer"
date: 2019-05-20
---

## The Template

To start, ensure you have the Marlin firmware with the appropriate template settings for your Ender 3 / Pro with BLTouch.

1. Download the latest stable release of Marlin from the [official Marlin website](https://marlinfw.org/meta/download/).
2. Additionally, download the necessary configuration files from the [Marlin GitHub repository](https://github.com/MarlinFirmware/Marlin).
3. Once downloaded, extract the zip file to your desired location.
4. Copy the four files from `config/examples/Creality/Ender-3` to the `Marlin/` folder, overwriting the existing files if prompted.

## Configuration.h

Open the newly copied `Marlin/Configuration.h` file using a suitable code editor, such as Visual Studio Code. Customize your configuration using the following guidelines:

- Change `STRING_CONFIG_H_AUTHOR` to a distinct name, clearly differentiating your custom configuration.
- Disable the `SHOW_BOOTSCREEN` and `SHOW_CUSTOM_BOOTSCREEN` by commenting out the lines with `//`.
- Adjust the `BAUDRATE` to match your printer's specifications.
- Modify the `CUSTOM_MACHINE_NAME` to reflect your printer model.
- For BLTouch users:
    - Uncomment `#define BLTOUCH`.
    - Adjust the `NOZZLE_TO_PROBE_OFFSET` based on your setup.
    - Increase `PROBING_MARGIN` and `XY_PROBE_SPEED` for efficient probing.
    - Enable bilinear ABL and customize the grid size if necessary.
    - Uncomment `#define LCD_BED_LEVELING` to add bed leveling menu items.
- Customize the bed size and travel limits to accommodate any non-standard bed setup.
- Enable `Z_SAFE_HOMING` to ensure safe homing operations.

## Configuration_adv.h

Open the `Marlin/Configuration_adv.h` file in your preferred text editor and make the following adjustments:

- Fine-tune the `BLTOUCH_DELAY` for a more efficient probing process.
- Adjust `BABYSTEP_MULTIPLICATOR_Z` and `_XY` to facilitate precise calibration.
- Enable `LIN_ADVANCE` if desired, and set `LIN_ADVANCE_K` accordingly for improved print quality at higher speeds.
- Customize the temperature monitoring parameters to suit your operating environment.
- Adjust other settings as needed based on your specific requirements and hardware setup.

## Uploading to the Printer

Before uploading the new firmware, save a copy of your current printer settings using the `M503` command.

Open `Marlin/Marlin.ino` with Visual Studio Code, compile it using PlatformIO, and upload the new firmware to your printer.

After uploading, use `M502` to set the firmware with the specified configurations and use `M500` to store these settings in the EEPROM.

Depending on your setup, calibrate your Z-Probe Offset, PID for Hotend and Heated Bed, and Linear Advance, or set them to their previously saved values.

Enjoy the enhanced performance and capabilities of your Ender 3 / Pro with the customized Marlin 2.0 firmware and BLTouch integration!
