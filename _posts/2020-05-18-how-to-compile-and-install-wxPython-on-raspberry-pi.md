---
layout: post
title: "How to compile and install wxPython on Raspberry Pi?"
excerpt: If you need to install wxPython on Raspbian Buster for a project, the installation of that module can be a little bit tricky. It needs to be compiled for Raspbian from source files to have something working nicely.
tags: 
    - Programming
    - Python
    - Arduino
color: green
image: "/assets/images/wxPython-RaspberryPi-1-1536x1152.jpg"
image-desc: "Illustration Computer with Python logo"
author:
- Marc Dobler
meta: "Z-Offset for 3D printer"
---

If you need to install wxPython on Raspbian Buster for a project, the installation of that module can be a little bit tricky. It needs to be compiled for Raspbian from source files to have something working nicely.

Here you can find step by step explanation of how to do it.

## Requirements
- Raspberry Pi
- Python 3.x
- time, lots of time

## Step 1

First, you need to open a terminal (shortcut ctrl + alt + t)

```bash
sudo apt-get update
```

```bash
sudo apt-get install dpkg-dev build-essential libjpeg-dev libtiff-dev libsdl1.2-dev libgstreamer-plugins-base0.10-dev libnotify-dev freeglut3 freeglut3-dev libwebkitgtk-dev libghc-gtk3-dev libwxgtk3.0-gtk3-dev
```

if you use the pre-installed Python 3:

```bash
sudo apt-get install python3.7-dev
```

## Step 2

Now, let’s make the virtual environment. I made mine right off the /home/pi directory, but you can put it anywhere. Some like to put all their virtual environments (virtenv) in specific locations.

Let’s make one (wx is the name of the virtenv we are creating, change it to suit):

```bash
cd ~
```

```bash
python3 -m venv wx
```

```bash
source ~/wx/bin/activate
```

## Step 3

The first thing you need is wxPython.

Go to:

[https://pypi.org/project/wxPython/#files](https://pypi.org/project/wxPython/#files)

Down of the bottom of the choices, you will see “wxPython-4.1.0.tar.gz … Source”.

Download wxPython-4.1.0.tar.gz

Use your browser if you can. The file should go into your ~/Downloads folder. The link currently is the very human unfriendly:

[https://files.pythonhosted.org/packages/cb/4f/1e21d3c079c973ba862a18f3be73c2bbe2e6bc25c96d94df605b5cbb494d/wxPython-4.1.0.tar.gz](https://files.pythonhosted.org/packages/cb/4f/1e21d3c079c973ba862a18f3be73c2bbe2e6bc25c96d94df605b5cbb494d/wxPython-4.1.0.tar.gz)

Okay, that’s not exactly a professional comment but sometimes you just have to call it what it is.

```bash
cd ~
```

```bash
mv ~Downloads/wxPython-4.1.0.tar.gz
```

```bash
tar xf wxPython-4.1.0.tar.gz
```

Next step, make sure you are in the environment you want to install wxPython into.

```bash
cd wxPython-4.1.0
```

```bash
pip3 install -r requirements.txt
```

The next part is the big one. This will take a while, anywhere from a few hours to 18+ hours on a Raspberry Pi Zero.

```bash
python3 build.py build bdist_wheel --jobs=1
```

## After waiting ~ 8 hours

Now to install it in Python as a package (the name of this file varies depending on the Python version you build it with. ie. wxPython-4.1.0-cp38-cp38-linux_armv7l.whl for Python 3.8) :

```bash
cd ~/wxPython-4.1.0/dist
```

```bash
pip3 install wxPython-4.1.0-cp37-cp37m-linux_armv7l.whl
```

## After waiting ~ 1 hour

Now let’s test it:

```bash
cd ~/wxPython-4.1.0.post2/demo
```
```bash
python3 demo.py
```

Enjoy!