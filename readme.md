# WebScrap

WebScrap is a Node.js and Express project that provides an API for comparing the prices of a specific medicine across different leading web medicine providers. The project utilizes Cheerio for web scraping.

## Installation

1. Clone the repository: `git clone https://github.com/AdityaRajputRana/MedPriceComparison.git`
2. Navigate to the project directory: `cd MedPriceComparison`
3. Install the dependencies: `npm install`

## Usage

To compare the prices of a medicine, make a GET request to the `/compare/:drugName` endpoint in `app.js`. Replace `:drugName` with the name of the medicine you want to compare.

The API will scrape the prices from various web medicine providers and return a JSON array of the response.


## Dependencies

WebScrap relies on the following dependencies:

- Node.js
- Express
- Cheerio

Make sure you have these dependencies installed before running the project.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please feel free to open an issue or submit a pull request.