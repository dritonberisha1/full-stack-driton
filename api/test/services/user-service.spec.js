import sinon from 'sinon';
import assert from 'assert';
import userService from '../../src/services/user-service';
import userRepository from '../../src/repositories/user-repository';

const stubbedFunctions = [];

describe('User Service Tests', () => {
    afterEach('Restore sinon stubs', function () {
        stubbedFunctions.forEach(stub => stub.restore());
    });

    describe('createUser', () => {
        it('should throw error when user is not provided', () => {
            return userService.createUser('')
                .then(() => assert.fail('This should not resolve'))
                .catch((error) => assert.ok(error.toString().toLowerCase().includes('user should be provided')))
        });
        it('should throw error when user password is not provided', () => {
            return userService.createUser({username: ''})
                .then(() => assert.fail('This should not resolve'))
                .catch((error) => assert.ok(error.toString().toLowerCase().includes('user should have password')))
        });
        it('should resolve when user is created', () => {
            const testUser = {id: 1, username: 'test', password: 'test'};
            stubbedFunctions.push(sinon.stub(userRepository, 'createUser').resolves(testUser));
            return userService.createUser({password: 'test'})
                .then((results) => assert.deepEqual(results, testUser))
                .catch((error) => assert.fail('this should not throw error'))
        });
    });

    describe('getUser', () => {
        it('should throw error when user id is not provided', () => {
            return userService.getUser({})
                .then(() => assert.fail('This should not resolve'))
                .catch((error) => assert.ok(error.toString().toLowerCase().includes('user id not provided')))
        });
        it('should throw error when user is not found', () => {
            stubbedFunctions.push(sinon.stub(userRepository, 'getUser').resolves([]));
            return userService.getUser({id: 2})
                .then(() => assert.fail('This should not resolve'))
                .catch((error) => assert.ok(error.toString().toLowerCase().includes('user not found')))
        });
        it('should resolve when we get user', () => {
            const savedUser = [
                [
                    {id: 1, username: 'test'}
                ],
                [
                    {id: 2, username: 'liked_test'},
                    {id: 3, username: 'liked_test_2'},
                ]
            ];

            const testUser = {
                id: 1,
                username: 'test',
                likedUsers: [
                    {id: 2, username: 'liked_test'},
                    {id: 3, username: 'liked_test_2'},
                ]
            };
            stubbedFunctions.push(sinon.stub(userRepository, 'getUser').resolves(savedUser));
            return userService.getUser({id: 1})
                .then((results) => assert.deepEqual(results, testUser))
                .catch((error) => assert.fail('this should not throw error'))
        });
    });
});