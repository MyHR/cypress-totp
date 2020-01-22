# Installation
1. Install
    ```shell script
    npm i -D https://github.com/myhr/cypress-totp.git
    ```
2. Edit cypress/plugins/index.js
    ```javascript
    module.exports = (on, config) => {
       on("task", {
           generateTOTP: require("cypress-totp"),
       });
    };
    ```

# Usage
```javascript
cy.task("generateTOTP", { secret: "SECRET" }).then(token => {
    // handle stuff
})
```

# Options
|**Name**|**Type**|**Default**|**Description**|
|---|---|---|---|
|secret|String (required)|   |Shared secret key|
|threshold|Number|5|Valid values: 0 - 20|
|encoding|String|base32|Key encoding (ascii, hex, base32, base64)|
