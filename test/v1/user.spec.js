import { expect, should } from 'chai';

import * as user_repo from '../../src/v1/users/users.repository';
import userDB from '../../src/v1/users/users.db';

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
})