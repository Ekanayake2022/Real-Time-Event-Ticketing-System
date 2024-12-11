# Ticketing System

This project is a ticketing system that manages ticket pools, vendors, and customers. It includes a backend server built with Node.js and Express, and a frontend client built with React.

## Table of Contents

- [Setup](#setup)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)

## Setup

Install backend dependancies:

### `cd Real-Time-Event-Ticketing-System`

### `npm install`

Install frontend depencies:

### `cd client`

### `npm install`

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Backend Setup

1. Clone the repository:

### `git clone https://github.com/Ekanayake2022/Real-Time-Event-Ticketing-System.git`

### `cd Real-Time-Event-Ticketing-System`

### `npm start`

The backend and frontend server will start on http://localhost:3001 and http://localhost:3000

Usage

1. Open your browser and navigate to http://localhost:3000
2. Use the control panel to start and stop the ticketing system
3. Add and remove vendors and customers using the provided forms.
4. View system logs and ticket availability in real-time.

API Endpoints

## System Control

1. **POST /api/start**: Start the ticketing system.
2. **POST /api/stop**: Stop the ticketing system.

## Vendors

1. **POST /api/vendors**: Add a vendor.
2. **DELETE /api/vendors/:vendorId**: Remove a vendor.

## Customers

1. **POST /api/customers**: Add a customer.
2. **DELETE /api/customers/:id**: Remove a customer.

## Tickets

1. **GET /api/tickets**: Retrieve tickets.

## Logs

1. **GET /api/logs**: Retrieve logs.

## API Documentation

1. Open your browser and navigate to [http://localhost:3001/api-docs/](http://localhost:3001/api-docs/)
