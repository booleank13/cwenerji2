from playwright.sync_api import sync_playwright
import os

def verify_footer():
    if not os.path.exists("index.html"):
        print("Error: index.html not found")
        return

    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page(viewport={"width": 375, "height": 812})

        page.goto(f"file://{os.path.abspath('index.html')}")

        # Verify footer exists
        footer = page.locator("footer")
        assert footer.is_visible()

        # Verify button exists and text
        button = page.locator(".footer-button")
        assert button.is_visible()
        assert button.inner_text() == "Proje Haritamız"

        # Verify href
        href = button.get_attribute("href")
        expected_url = "https://cw-enerji.com/tr/proje-haritamiz"
        assert href == expected_url, f"Expected {expected_url}, but got {href}"

        print("Footer button verified successfully.")

        # Take screenshot
        if not os.path.exists("/home/jules/verification"):
            os.makedirs("/home/jules/verification")
        page.screenshot(path="/home/jules/verification/footer_verification.png", full_page=True)
        print("Screenshot captured.")

        browser.close()

if __name__ == "__main__":
    verify_footer()
