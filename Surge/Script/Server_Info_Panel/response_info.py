#!/usr/bin/env python3
# Sestea

import http.server
import socketserver
import json
import time
import psutil

# The port number of the local HTTP server, which can be modified
port = 7122

class RequestHandler(http.server.BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()

        # Limit the HTTP server to one request per second
        time.sleep(1)

        # Obtain CPU/MEM usage and network traffic info
        cpu_usage = psutil.cpu_percent()
        mem_usage = psutil.virtual_memory().percent
        bytes_sent = psutil.net_io_counters().bytes_sent
        bytes_recv = psutil.net_io_counters().bytes_recv

        # Calculate uptime
        uptime_seconds = int(time.time() - psutil.boot_time())
        uptime_hours, uptime_seconds = divmod(uptime_seconds, 3600)
        uptime_minutes, uptime_seconds = divmod(uptime_seconds, 60)

        # Construct JSON dictionary
        response_dict = {
            "cpu_usage": cpu_usage,
            "mem_usage": mem_usage,
            "uptime": f"{uptime_hours}h {uptime_minutes}m",
            "bytes_sent": str(bytes_sent),
            "bytes_recv": str(bytes_recv)
        }

        # Convert JSON dictionary to JSON string
        response_json = json.dumps(response_dict).encode('utf-8')
        self.wfile.write(response_json)

with socketserver.ThreadingTCPServer(("", port), RequestHandler) as httpd:
    try:
        print(f"Serving at port {port}")
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("KeyboardInterrupt is captured, program exited")