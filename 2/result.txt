## Title
Logout button unresponsive on Safari browser - no response to user interaction

## Description
Users are unable to successfully log out of the application when using Safari browser. The logout button appears to be completely unresponsive to user interaction, preventing users from properly terminating their sessions. This issue affects the core security functionality of the application as users cannot securely end their authenticated sessions.

## Steps to Reproduce
1. Open the application in Safari browser
2. Log into the application with valid credentials
3. Navigate to the logout functionality (locate the logout button)
4. Click on the logout button
5. Observe the system response

## Expected vs Actual Behavior
**Expected Behavior:** When the logout button is clicked, the user should be logged out of the application, their session should be terminated, and they should be redirected to the login page or home page.

**Actual Behavior:** The logout button does not respond to clicks and no logout action is performed. The user remains logged in to the application.

## Environment
- Browser: Safari
- Operating System: Not specified
- Device: Not specified
- Version/Build: Not specified

## Severity or Impact
**High** - This is a security-related issue that prevents users from properly terminating their sessions on Safari browser. While it may not affect all browsers, Safari users cannot securely log out, which could lead to unauthorized access if devices are shared or left unattended. This impacts core authentication functionality.