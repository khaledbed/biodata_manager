# test_authentification.py

# test register using curl
#curl -X POST -H "Content-Type: application/json" -d '{"username":"testuser","email":"test@example.com","password":"testpassword"}' http://localhost:5000/users/register

# test login using curl
#curl -X POST -H "Content-Type: application/json" -d '{"username":"testuser","password":"testpassword"}' http://localhost:5000/users/login

# test profile using curl
#curl -H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjpudWxsLCJleHAiOjE3MDg0NDAzMTF9.M8p5F9ZwBIn6Fgi4_fz-PkRHeR11dGdJ1V2Uvvmgax0" http://localhost:5000/users/profile/<user_id>
