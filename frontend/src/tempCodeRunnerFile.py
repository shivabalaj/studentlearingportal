import requests
from urllib.parse import urlparse, parse_qs, urlencode

def scan_url_xss(url):
    parsed = urlparse(url)
    params = parse_qs(parsed.query)

    payloads = ["'", '"', "alert", "<>"]

    print(f"\nScanning: {url}")

    if not params:
        print("No URL parameters found.")
        return

    vulnerable = False

    for param in params:
        for payload in payloads:
            test_params = {k: v[:] for k, v in params.items()}
            test_params[param] = [payload]

            test_query = urlencode(test_params, doseq=True)
            test_url = parsed._replace(query=test_query).geturl()

            try:
                response = requests.get(test_url, timeout=5)

                if payload in response.text:
                    print("Warning: Reflected input detected")
                    print(f"   Parameter: {param}")
                    print(f"   Payload  : {payload}")
                    print(f"   URL      : {test_url}")
                    vulnerable = True

            except requests.RequestException as e:
                print(f"Request error: {e}")

    if not vulnerable:
        print("Success: No reflection found -> NOT vulnerable")

if __name__ == "__main__":
    target = input("Enter URL with parameters: ").strip()
    scan_url_xss(target)