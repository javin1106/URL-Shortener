# 🔗 URL Shortener

A modern, efficient URL shortening service built with Node.js, Express, and MongoDB. Transform long URLs into short, shareable links with ease.

## ✨ Features

- 🚀 **Fast URL Shortening** - Convert long URLs into short, memorable links
- 🔄 **URL Redirection** - Seamlessly redirect users to original URLs
- 🗄️ **MongoDB Storage** - Reliable and scalable database solution
- 🔒 **Input Validation** - Robust URL validation to ensure data integrity
- 🛡️ **CORS Enabled** - Cross-Origin Resource Sharing for flexible integration
- ⚡ **Rate Limiting** - Protection against abuse with express-rate-limit
- 🎯 **RESTful API** - Clean and intuitive API endpoints
- 🔧 **Error Handling** - Comprehensive error handling middleware

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher)
- **MongoDB** (v4.4 or higher)
- **npm** or **yarn** package manager

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/javin1106/URL-Shortener.git
   cd URL-Shortener
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/url-shortener
   ```

4. **Start MongoDB**
   
   Make sure MongoDB is running on your system:
   ```bash
   # On macOS with Homebrew
   brew services start mongodb-community
   
   # On Linux
   sudo systemctl start mongod
   
   # On Windows
   net start MongoDB
   ```

5. **Run the application**
   ```bash
   # Development mode with auto-restart
   npm run dev
   
   # Production mode
   npm start
   ```

The server will start on `http://localhost:5000` (or your specified PORT).

## 📁 Project Structure

```
URL-Shortener/
├── src/
│   ├── config/        # Configuration files (database, etc.)
│   ├── controllers/   # Request handlers
│   ├── middleware/    # Custom middleware functions
│   ├── models/        # Mongoose schemas
│   ├── routes/        # API route definitions
│   └── utils/         # Utility functions
├── app.js             # Express app configuration
├── server.js          # Server entry point
├── package.json       # Project dependencies
└── .env               # Environment variables (create this)
```

## 🔌 API Endpoints

### Create Short URL

**POST** `/api/url/shorten`

Create a new shortened URL.

**Request Body:**
```json
{
  "originalUrl": "https://www.example.com/very/long/url/that/needs/shortening"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "shortUrl": "abc123",
    "originalUrl": "https://www.example.com/very/long/url/that/needs/shortening",
    "createdAt": "2026-01-29T10:30:00.000Z"
  }
}
```

### Redirect to Original URL

**GET** `/:shortCode`

Redirect to the original URL using the short code.

**Example:**
```
http://localhost:5000/abc123
```

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js v5.2.1
- **Database:** MongoDB with Mongoose ODM v9.1.2
- **Security:** express-rate-limit v8.2.1
- **Environment:** dotenv v17.2.3
- **Validation:** is-url v1.2.4
- **Dev Tools:** nodemon v3.1.11

## 🔐 Security Features

- **CORS Protection** - Configured Cross-Origin Resource Sharing
- **Rate Limiting** - Prevents API abuse and DDoS attacks
- **URL Validation** - Ensures only valid URLs are processed
- **Error Handling** - Secure error messages without exposing sensitive data

## ⚙️ Environment Variables

| Variable       | Description                    | Default               |
|----------------|--------------------------------|-----------------------|
| `PORT`         | Server port number             | `5000`                |
| `MONGODB_URI`  | MongoDB connection string      | Required              |

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 👤 Author

**javin1106**

- GitHub: [@javin1106](https://github.com/javin1106)

---

⭐️ If you found this project helpful, please consider giving it a star!
