# Eyego Task

## Task Overview

---

## This project implements a scalable event-driven microservice using Node.js, Express, and Kafka to process user activity logs and store them in MongoDB. The service is containerized with Docker for easy deployment.

## Features

* Kafka producer and consumer for real-time log processing
* Stores processed logs in MongoDB with **indexing** for faster queries
* Dockerized for consistent environment setup
* Easily extendable microservice architecture
* **Exposed API** for querying processed logs

---

## Architecture Choices

The project is split into three microservices:

1. **Producer Service**: Responsible for producing messages to Kafka.
2. **Consumer Service**: Processes messages from Kafka and handles business logic.
3. **Query Service**: Provides API endpoints to query processed data.

Each service follows **Domain-Driven Design (DDD)** principles and has the following structure:

* **domain/**: Defines the entities of the service.
* **application/**: Contains business logic, depends only on interfaces.
* **infrastructure/**: Concrete implementation of infrastructure (DB, message queue, etc.).
* **API/**: Defines the routes and HTTP endpoints.
* **index.js**: Entry point that connects and combines the service.

---

## Accessing the Exposed API

You can query the processed logs via the API. For example:

```
GET http://34.58.4.76:3000/api/log?page=1&limit=10&action=click
```

This endpoint supports **pagination** and **filtering by action type**.

---

## Prerequisites

Make sure you have installed the following tools:

* [Node.js](https://nodejs.org/) >= 18.x
* [Docker](https://www.docker.com/) >= 24.x
* [MongoDB](https://www.mongodb.com/)
* [Kafka](https://kafka.apache.org/)

---

## Getting Started

### Clone the repository

```bash
git clone https://github.com/hassan1876/EyeGo-task.git
cd EyeGo-task
```

### Install dependencies

```bash
npm install
```

### Environment Variables

Create a `.env` file for each service and set the following variables:

```env
KAFKA_BROKER=localhost:9092
MONGO_URI=mongodb://localhost:27017/logsdb
PORT=3000
```

---

## Running Locally

Start the service locally:

```bash
npm run start
```

---

## License

MIT License © Hassan Magdi
