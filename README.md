# Thermostat (UI)
Application for showing chart of thermostat details and also upload thermostat data.

## Pre-requisite

  - Node js version 10.15.0
  - Angular version 8

### Installation

- Open other terminal and change directory to `angular-thermostat-chart`.

- Install all the frontend dependency
    ```sh
    $ npm install
    ```
    
### Deploy
- Run the thermostat app locally.

    >Boot the application

    ```sh
    $ npm run start
    ```
    

### To use the app
- Navigate to [http://localhost:4200/](http://localhost:4200/)
- To upload data click on `File Upload` option and upload a .json file containing records.
- To see chart select the specific date range and click `select` button.
- 
## NOTE
If there isn't any data in database then no chart will be displayed. To resolve this you need to upload data through `File Upload` option in the navbar. Once data upload process is done charts will be visible depending on specific date range selected.
