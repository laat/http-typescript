#!/bin/bash
curl -X GET "https://httpbin.org/ip" -H "accept: application/json" | yarn validate ip/GET.v1.0.ts