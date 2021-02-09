---
layout: post
title: "How to calibrate Z-Offset with a BLTouch bed leveling probe?"
image: "/assets/images/BLTouch-ZOffset-1536x1152.jpg"
image-desc: "Illustration Computer with BLTouch logo"
categories: 3D Printer
author:
- Marc Dobler
meta: "Z-Offset for 3D printer"
---

## Requirements
- Any kind of software you can send GCODE through the terminal like Octoprint
- Piece of paper 90g/cm3

## Z-Offset Instructions:
- G28 – Home 3D printer
- M851 Z0 – Reset Z0 Offset
- M500 – Store setting to EEPROM
- M501 – Set active parameters
- M503 – Display Active Parameters
- G28 Z – Home Z-Axis
- G1 F60 Z0 – Move nozzle to true 0 offset
- M211 S0 – Switch off soft endstops
- Move nozzle towards bed slowly until the paper can barely move
- Take note of the Z on the printer display (take that number and add the measurement of the calibration sheet or device used)
- M851 Z X.XX (X.XX being your z offset achieved)
- M211 S1 – Enable Soft Endstops
- M500 – Save settings to Eeprom
- M501 – Set Active Parameters
- M503 – display current settings

Enjoy!