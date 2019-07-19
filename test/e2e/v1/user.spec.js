import { expect, should } from 'chai';

import * as user_repo from '../../../src/v1/users/users.repository';

describe("user.repository", function() {
    describe("create", function() {
        it("should insert a user into the database", function(done) {
            let user = Object.assign({}, {
                email: "test@test.com",
                password: "test_password123",
                firstname: "sample",
                lastname: "user"
            });

            user_repo.create(user).then(
                (val) => {
                    expect(val.email).to.be.equal(user.email);
                    expect(val.password).to.be.a('string');
                    expect(val.password).to.not.be.equal(user.password);
                    done()
                }, 
                (err) => done(err));
        });
    });
    describe("findByEmail", () => {
        it("should retrieve user from email", (done) => {
            user_repo.findByEmail("test@test.com").then(
                (user) => {
                    expect(user).to.not.be.null;
                    expect(user.email).to.be.equal("test@test.com");
                    done();
                },
                (err) => done(err)
            );
        });
    });
    describe("password", () => {
        it("should not be stored as plaintext", function(done) {
            user_repo.findByEmail("test@test.com").then(
                (user) => {
                    expect(user.password).to.not.be.null;
                    expect(user.password).to.not.be.equal("test_password123");
                    done();
                },
                (err) => done(err)
            );
        });
        describe("comparePassword", () => {
            it("should return true for correct input password", (done) => {
                user_repo.findByEmail("test@test.com").then(
                    (user) => {
                        user_repo.comparePassword("test_password123", user.password).then(
                            (same) => {
                                expect(same).to.be.true;
                                done();
                            },
                            (err) => done(err)
                        );
                    },
                    (err) => done(err)
                );
            });
            it("should return false for incorrect password", (done) => {
                user_repo.findByEmail("test@test.com").then(
                    (user) => {
                        user_repo.comparePassword("incorrect_password", user.password).then(
                            (same) => {
                                expect(same).to.be.false;
                                done();
                            },
                            (err) => done(err),
                        );
                    },
                    (err) => done(err)
                );
            });
        });
    });
})