# Wearable Telemetry Demo

A Codex-assisted browser prototype inspired by a 2021 Arduino/Blynk wearable project. The demo generates synthetic pulse samples once a second, plots a rolling 60-sample window and exports that window as CSV with UTC timestamps.

Open `index.html` in a browser. The demo runs locally with no dependencies or account. Pause and resume the simulation with the dashboard control. To try the export, collect a few readings, pause the simulation and download the CSV.

The original project description mentions a portable monitoring device and a mobile app using Arduino IDE and Blynk. This demo models the telemetry display with simulated values. The original hardware, firmware and sensor specifications would be needed to document or reproduce the wearable. This engineering demo has no clinical use.
