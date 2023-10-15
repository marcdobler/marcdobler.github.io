---
layout: posts
title: "Building wxPython On Raspberry Pi"
excerpt: Installing wxPython on Raspbian Buster can be tricky, requiring compilation from source files. Here's a step-by-step guide to help you through the process.
tags: 
    - Programming
    - Python
    - Arduino
color: green
image: "/assets/images/wxPython-RaspberryPi-1-1536x1152.jpg"
image-desc: "Illustration: Computer with Python logo"
author:
- Marc Dobler
meta: "Z-Offset for 3D printer"
date: 2020-05-18
---

If you need to install wxPython on Raspbian Buster for a project, the installation of that module can be a little bit tricky. It needs to be compiled for Raspbian from source files to have something working nicely. Here, you'll find a detailed step-by-step explanation of how to do it.

## Requirements
- Raspberry Pi
- Python 3.x
- Patience (lots of it)

## Step 1

First, open a terminal (shortcut: `Ctrl + Alt + T`) and update your system:

```bash
sudo apt-get update
```

Install the necessary dependencies:

```bash
sudo apt-get install dpkg-dev build-essential libjpeg-dev libtiff-dev libsdl1.2-dev libgstreamer-plugins-base0.10-dev libnotify-dev freeglut3 freeglut3-dev libwebkitgtk-dev libghc-gtk3-dev libwxgtk3.0-gtk3-dev
```

If you're using the pre-installed Python 3:

```bash
sudo apt-get install python3.7-dev
```

## Step 2

Create a virtual environment. For instance:

```bash
cd ~
python3 -m venv wx
source ~/wx/bin/activate
```

## Step 3

Download wxPython from [https://pypi.org/project/wxPython/#files](https://pypi.org/project/wxPython/#files) by clicking on "wxPython-4.1.0.tar.gz" under the "Source" section.

Move the downloaded file to the home directory and extract it:

```bash
cd ~
mv ~/Downloads/wxPython-4.1.0.tar.gz .
tar xf wxPython-4.1.0.tar.gz
cd wxPython-4.1.0
pip3 install -r requirements.txt
python3 build.py build bdist_wheel --jobs=1
```

## After waiting for approximately 8 hours

Install it as a package (the filename varies depending on the Python version):

```bash
cd ~/wxPython-4.1.0/dist
pip3 install wxPython-4.1.0-cp37-cp37m-linux_armv7l.whl
```

## After waiting for approximately 1 hour

Test the installation:

```bash
cd ~/wxPython-4.1.0.post2/demo
python3 demo.py
```

Enjoy the power of wxPython on your Raspberry Pi!
```