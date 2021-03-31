---
layout: post
title: "How to configure Marlin 2.0 for an Ender 3 / Pro and BLTouch"
excerpt: A good start to get how firmware work, and nice tips to make it custom version for Ender 3 BLTouch
tags: [3D Printer, Ender]
color: bluegrey
image: "/assets/images/ender-3-pro-desktop-1536x1152.jpg"
image-desc: "My personnal desktop with 3d printer ender3 pro"
author:
- Marc Dobler
meta: "Z-Offset for 3D printer"
---

## The Template

Firstly, you’ll need the Marlin firmware with the appropriate template settings.

1. Start by downloading the latest stable release of Marlin from here and the configuration files here.
2. Extract the zip.
3. Copy the 4 files from config/examples/Creality/Ender-3 to the Marlin/ folder, overwriting the 2 already there.

## Configuration.h

Open the new Marlin/Configuration.h file using a text editor suitable for code, like vs code. We’ll customize our configuration now:

1. Change `STRING_CONFIG_H_AUTHOR` to clearly differentiate the configuration from the default
2. Disable `SHOW_BOOTSCREEN` and `SHOW_CUSTOM_BOOTSCREEN` to save space by commenting out the lines (prefix them with //  )
3. Ensure you have the correct `BAUDRATE`. The original Ender 3 was configured to 115200 by Creality, but the newer Ender 3 Pro (and newer Creality motherboards) default to 250000. You may be fine with 250000 on an older Ender 3.
4. Change `CUSTOM_MACHINE_NAME` to represent your printer, e.g. "Ender 3 Pro"
5. If you’re using a BLTouch ABL sensor:
    1. Uncomment `#define BLTOUCH`
    2. `#define SERVO0_PIN 27` is not required to set up your BLTouch in Marlin 2.x, as it’s defined in the pins folder by default
    3. You’ll need to customize the offset between Probe and Extruder. In Marlin 1.x, this was done with X, Y, and 4. `Z_PROBE_OFFSET_FROM_EXTRUDER`. In Marlin 2.x, they’re now combined in `NOZZLE_TO_PROBE_OFFSET`. Instructions are in the comments. Using the Creality BLTouch Kit bracket, mine is { -43, -9, 0 }. It’s safer to leave Z as 0 here are calibrate this yourself later.
    4. To keep the probe away from the edge of the bed, increase `PROBING_MARGIN` to 20
    5. You can increase `XY_PROBE_SPEED` to 10000 to speed up probing slightly
    6. Uncomment #define `AUTO_BED_LEVELING_BILINEAR` to enable bilinear ABL
    7. By default, bilinear ABL uses a 3×3 grid. You can change this by editing `GRID_MAX_POINTS_X` under `EITHER`(`AUTO_BED_LEVELING_LINEAR`, `AUTO_BED_LEVELING_BILINEAR`). Mine is set to 5, for a 5×5 grid
    8. Uncomment `#define LCD_BED_LEVELING` to add bed leveling menu items

6. If your bed is non-standard, you’ll need to adjust the size and/or travel limits to make sure Marlin knows this. I use bulldog clips to secure a glass bed. To ensure the nozzle stays clear of the clips, I’ve changed the following: `Y_BED_SIZE` from 235 to 199, `X_MIN_POS` from 0 to -2, `Y_MIN_POS` from 0 to -24.
7. Uncomment `Z_SAFE_HOMING`. This prevents your Z homing from occurring without prior X and Y homing. Without this, you may accidentally miss the bed when homing Z.
8. To increase the homing speed, increase `HOMING_FEEDRATE_XY` from (20*60) to (40*60) and `HOMING_FEEDRATE_Z` from (4*60) to (8*60).
9. If you want to use PID to efficiently heat your bed, uncomment `#define PIDTEMPBED`. You’ll need to calibrate this later.
10. If you’re using a “silent” Creality board v1.1.4 or v1.1.5, you’re using TMC2208 drivers in standalone mode. Uncomment X, Y, Z, and `E0_DRIVER_TYPE` and set them to `TMC2208_STANDALONE`.
11. To save space, uncomment #define SLIM_LCD_MENUS. This will remove any menu items that you won’t need if controlling using a PC or OctoPrint.
12. To save space, comment out `#define SPEAKER`. This will stop fully disable the speaker.
13. To save space if you won’t be printing from an SD card, comment out #define `SDSUPPORT`.
14. Save the file and close the file.

## Configuration_adv.h

Open the new Marlin/Configuration_adv.h file in your chosen text editor.

1. If you’re using a BLTouch:
    1. Uncomment `#define BLTOUCH_DELAY` and change from 500 to 200. This reduces the pause after each individual probe.
    2. Baby stepping allows the nozzle to move a tiny amount without changing the recorded coordinates for the hot-end. This is usually used for calibrating your Z Offset for a perfect first layer. You can increase `BABYSTEP_MULTIPLICATOR_Z` and `_XY` to 10 for faster motion.
    3. Uncomment `BABYSTEP_ZPROBE_OFFSET` and `#define BABYSTEP_ZPROBE_GFX_OVERLAY`
2. If you want to use Linear Advance to increase your print quality at higher speeds, uncomment `#define LIN_ADVANCE` and set `LIN_ADVANCE_K` from 0.22 to 0, which will enable the feature but turn it off. Your GCODE will need to specify the K value, which you’ll calibrate later. You need different K values for different filament types. Note that LinearsAdvance is not compatible with the TMC2208 stepper driver in Standalone mode (using StealthChop), so will not worth it with Creality “silent” boards v1.1.4 and v1.1.5.
3. To save space, comment out #define `ARC_SUPPORT`. This feature is used by other types of CNC machines, but usually not 3D printers.
4. If you want to display progress and time remaining from another system with the M73 command, such as OctoPrint, uncomment `LCD_SET_PROGRESS_MANUALLY`. If your system will also send the M73 R parameter to update the time remaining, uncomment `USE_M73_REMAINING_TIME`.
5. Marlin watches the rate of temperature increase for hot-end and bed. If it’s too slow, it will trigger an error and halt your print. If you have the windows open for ventilation and it’s cold out, this can be a problem. Increase `WATCH_BED_TEMP_PERIOD` a little if you have this issue.
Save your changes and close the file.

## To The Printer!

Take a copy of your `M503` output to save your current printer settings. You’ll need to put some of these back later.

Open Marlin/Marlin.ino with the Visual Studio Code, compile with PlateformIO, and write the new firmware to your printer.

Run M502 to set all settings to those specified in your firmware files, then M500 to store these settings in the EEPROM.

Depending on your configuration, you’ll now want to calibrate your Z-Probe Offset, PID for Hotend and Heated Bed and Linear Advance, or set them from your previous values.

Enjoy!