Instruction for running the database(on port 5432):-

1. brew install postgres
2. pg_ctl -D /usr/local/var/postgres
3. psql postgres
4. Run fooloinf command inside psql to configure the database
    a. CREATE DATABASE abc;
    b. CREATE USER rajnish with password 'random'
    c. ALTER ROLE rajnish SET client_encoding to 'utf8'
    d. ALTER ROLE rajnish SET default_transaction_isolation TO 'read_committed'
    e. ALTER ROLE rajnish SET timezone to 'UTC'
    f. GRANT ALL PRIVILEGES on DATABASE abc to rajnish

Instruction to run the backend:-

1. cd backend
2. virtualenv venv