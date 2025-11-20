# Project Name

A brief description of your project and its purpose.

> This project implements a scalable event-driven microservice using **Node.js**, **Express**, and **Kafka** to process user activity logs and store them in **MongoDB**. The service is containerized with **Docker** for easy deployment.

---

## Features

* Kafka producer and consumer for real-time log processing
* Stores processed logs in MongoDB with indexing
* Dockerized for consistent environment setup
* Easily extendable microservice architecture

---

## Prerequisites

Make sure you have installed the following tools:

* [Node.js](https://nodejs.org/) >= 18.x
* [Docker](https://www.docker.com/) >= 24.x
* [Docker Compose](https://docs.docker.com/compose/) >= 2.x
* [MongoDB](https://www.mongodb.com/)
* [Kafka](https://kafka.apache.org/) 

---

## Getting Started

### Clone the repository

```bash
git clone https://github.com/yourusername/your-repo.git
cd your-repo
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
## Architecture choices
Splitted the service into three microservices producer-service, consumer-service(processing), query-service
and to adhere to the DDD ( Domain-Driven-Design ) each service have:
    domain directory defining its entities
    application directory defining buisness logic and dpends on interface only
    infrastructure directory define the concrete implementation of infrastructure like DB, message queue
    API directory define the routes
    index file combining and connecting the whole service
---

## License

MIT License © Hassan Magdi
