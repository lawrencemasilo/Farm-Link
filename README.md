# Farm-Link

Farm Link is a web application designed to connect small-scale farmers with major distribution centers and wholesalers. Our goal is to streamline the supply chain process, making it easier for farmers to get their produce to market and for distributors to source fresh, local products.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features
- **Farmer Profiles**: Farmers can create and manage their profiles, listing their available produce and quantities.
- **Order Management**: Distributors can place orders with multiple farmers, track order status, and manage deliveries.
- **Analytics Dashboard**: Insights and analytics for both farmers and distributors to track performance and sales.

## Technologies Used
- **Frontend**: HTML, CSS, JavaScript, React.js
- **Backend**: Node.js, Express.js, MongoDB
- **Authentication**: JWT (JSON Web Tokens)

## Installation
To run this project locally, follow these steps:

1. **Clone the repository**:
```bash
git clone https://github.com/lawrencemasilo/Farm-Link.git
```

2. **Navigate to the project directory**:
```bash
cd Farm-Link
```

3. **Install dependencies**:
```bash
npm install
```

4. Set up environment variables:
- Create a `.env` file in the root directory
- Add the following environment variables:
```env
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=3001
NODE_ENV=development
JWT_EXPIRY_TIME=5d
COOKIE_EXPIRERY_TIME=5
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
EMAIL_HOST=smtp.gmail.com
EMAIL_HOST_USER=your_email_address
DEFAULT_FROM_EMAIL=your_email_address
EMAIL_HOST_PASSWORD=your_email_password
EMAIL_PORT=587
FROM_NAME=Farm Link
```
- Note: Replace `your_mongodb_uri`, `your_jwt_secret`, `your_google_maps_api_key`, `your_email_address`, and `your_email_password` with your own values.

5. Start the development server:
```bash
npm run dev
```

## Usage
1. Register an account.
2. Create a profile: Farmers can list their produce and available quantities.
3. Track orders: Both farmers and distributors can track order status and manage deliveries.
4. View analytics: Farmers and distributors can view insights and analytics to track performance and sales.

## Contributing
We welcome contributions to improve Farm Link. Here's how you can get started:

1. Fork the repository.

2. Create a new branch
```bash
git checkout -b feature/branch-name
```

3. Make your changes and commit them
```bash
git commit -m 'commit message'
```

4. Push to the main branch
```bash
git push origin feature/branch-name
```

5. Open a pull request.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.

## Contact
If you have any questions or suggestions, feel free to reach out to us at:

- **GitHub Issues**: [Farm Link Issues](https://github.com/lawrencemasilo/Farm-Link/issues)

Thank you for using Farm Link! 🌾
