import sys
sys.path.append("..")

import os
import app as ns
import unittest
import tempfile

class FlaskTestCase(unittest.TestCase):

    ######################
    # SetUp and TearDown #
    ######################

    def setUp(self):
        self.db_fd, ns.app.config['DATABASE'] = tempfile.mkstemp()
        ns.app.testing = True
        self.app = ns.app.test_client()
        # with ns.app.app_context():
        #     app.init_db()         
    
    def tearDown(self):
        os.close(self.db_fd)
        os.unlink(ns.app.config['DATABASE'])

    ##################
    # Helper methods #
    ##################

    def login(self, username, password):
        return self.app.post(
            '/loginC',
            data=dict(username=username, password=password),
            follow_redirects=True
        )

    def logout(self):
        return self.app.get(
            '/logout',
            follow_redirects=True
        )

    #########
    # Tests #
    #########

    def test_home_status_code(self):
        result = self.app.get('/')
        self.assertEqual(result.status_code, 200)

    def test_redir_to_login(self):
        result = self.app.get('/managerprofile')
        self.assertEqual(result.status_code, 302)

if __name__ == "__main__":
    unittest.main()