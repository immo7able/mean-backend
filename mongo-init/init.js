db = db.getSiblingDB('motoapp')

const adminExists = db.users.findOne({ email: 'admin@gmail.com' })

if (!adminExists) {
    db.users.insertOne({
        username: 'admin',
        email: 'admin@gmail.com',
        phoneNumber: '7777777777',
        password: '$2b$10$3yoaKCcEkjfrCLpoq/ssgeSSDmrO1g6Ovy4MGmNGdKkJXmi2lTgyS',
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
    })

    print('✅ Admin user created.')
} else {
    print('ℹ️ Admin user already exists.')
}
