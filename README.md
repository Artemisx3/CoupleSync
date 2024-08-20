## CoupleSync

## Features 

- Check the time until a certain a event
- Input custom start and end dates for events
- Check the weather of two different locations


## Prerequisites

- Node.js (v18 or later)
- npm (v6 or later)
  
## Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/Artemisx3/CoupleSync.git
   cd CoupleSync
   ```


2. **Install Dependencies**

    To install necessary node dependencies before use
   ```bash
   npm install
   ``` 

3. **Create Environment Variables**

   Rename the `.env.example` file to `.env` and update it with your own values:
 Example `.env` file:

   ```env
   WEATHER_API_KEY=your_weather_api_key_here
   ```

4. **Get API key for the weather**
 
  
   Which can be found here https://www.weatherapi.com/

5. **Start the app**
```bash 
npx ts-node app.ts
```
