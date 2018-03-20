import sys
sys.path.append("..")

import os
import app as ns
import unittest
import tempfile

class FlaskTestCase(unittest.TestCase):
    def setUp(self):
        self.db_fd, ns.app.config['DATABASE'] = tempfile.mkstemp()
        ns.app.testing = True
        self.app = ns.app.test_client()
        # with ns.app.app_context():
        #     app.init_db()         
    
    def tearDown(self):
        os.close(self.db_fd)
        os.unlink(ns.app.config['DATABASE'])

    def test_home_status_code(self):
        result = self.app.get('/')
        self.assertEqual(result.status_code, 200)

if __name__ == "__main__":
    unittest.main()