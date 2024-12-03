# Green Shadow Crop Monitoring System

Green Shadow Crop Monitoring System is a robust backend application built using **Spring Boot**, designed to manage crop-related data, field equipment, logs, and staff activities in an agricultural environment. This system provides user management, vehicle tracking, and various crop management features while ensuring data security with JWT-based authentication.

---

## Features

### 1. **Crop Management**
- Add, update, and delete crop details.
- View information on crop growth and associated tasks.

### 2. **Field Management**
- Manage field details and track field-specific activities.

### 3. **Equipment Management**
- Add and manage field equipment inventory.
- Assign equipment to specific fields or tasks.

### 4. **Log Management**
- Maintain logs for field activities, crop health, and equipment usage.

### 5. **Staff Management**
- Manage staff profiles, roles, and assignments.

### 6. **User Management**
- User registration, authentication, and role-based access control (RBAC).

### 7. **Vehicle Management**
- Track and manage vehicles used for field operations.

---

## Technology Stack

- **Programming Language:** Java 21
- **Framework:** Spring Boot
- **Build Tool:** Gradle
- **Database:** MySQL
- **ORM:** Hibernate
- **Security:** JWT Authentication
- **Version Control:** [Crop-backend GitHub Repository](https://github.com/Sam1ndaFernando/Crop-backend.git)

---

## Prerequisites

- **Java 21** installed.
- **Gradle** installed.
- MySQL Database setup with appropriate credentials.
- Optional: IDE such as IntelliJ IDEA or Eclipse for development.

---

## API Endpoints

### **Authentication**
- `POST /api/auth/register` - Register a new user.
- `POST /api/auth/login` - Login and receive a JWT token.

### **Crop Management**
- `GET /api/crops` - List all crops.
- `POST /api/crops` - Add a new crop.

### **Field Management**
- `GET /api/fields` - List all fields.
- `POST /api/fields` - Add a new field.

### **Equipment Management**
- `GET /api/equipment` - List all equipment.
- `POST /api/equipment` - Add new equipment.

### **Log Management**
- `GET /api/logs` - Fetch activity logs.
- `POST /api/logs` - Add a new log entry.

### **Staff Management**
- `GET /api/staff` - List all staff.
- `POST /api/staff` - Add new staff.

### **Vehicle Management**
- `GET /api/vehicles` - List all vehicles.
- `POST /api/vehicles` - Add a new vehicle.

---

## Security

- Uses **JWT (JSON Web Token)** for secure authentication and authorization.
- Role-based access control (RBAC) ensures data integrity and privacy.

---

## Contributing

Contributions are welcome! Follow these steps:
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m "Feature description"`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a pull request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Contact

For any questions or suggestions, feel free to reach out to the repository maintainer [Saminda Fernando](https://github.com/Sam1ndaFernando).

---

