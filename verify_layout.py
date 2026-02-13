from playwright.sync_api import sync_playwright
import os

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        # Load the page (assuming index.html is served or file path)
        page.goto("file://" + os.path.abspath("index.html"))

        # Check container dimensions
        container = page.locator(".app-container")
        box = container.bounding_box()
        print(f"Container Box: {box}")

        if box['width'] == 320 and box['height'] == 480:
            print("PASS: Container is 320x480")
        else:
            print(f"FAIL: Container size mismatch: {box['width']}x{box['height']}")

        # Check footer visibility within container
        footer = page.locator("footer")
        footer_box = footer.bounding_box()
        print(f"Footer Box: {footer_box}")

        # Ensure footer is essentially at the bottom of the container
        # Container Y + Height should be approx Footer Y + Height
        container_bottom = box['y'] + box['height']
        footer_bottom = footer_box['y'] + footer_box['height']

        # Allowing small rounding diffs
        if abs(container_bottom - footer_bottom) < 5:
            print("PASS: Footer is at the bottom of the container")
        else:
            print(f"FAIL: Footer bottom {footer_bottom} != Container bottom {container_bottom}")

        # Capture screenshot
        screenshot_path = "/home/jules/verification/layout_verification.png"
        os.makedirs(os.path.dirname(screenshot_path), exist_ok=True)
        page.screenshot(path=screenshot_path)
        print(f"Screenshot saved to {screenshot_path}")

        browser.close()

if __name__ == "__main__":
    run()
