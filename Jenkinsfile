def COLOR_MAP = ['SUCCESS': 'good', 'FAILURE': 'danger', 'UNSTABLE': 'danger', 'ABORTED': 'danger']
def BACKEND_SERVER_IP = "192.168.26.180"

pipeline {
  agent any
    
  tools {nodejs "NodeJS"}
      environment {
        NPM_CONFIG_FETCH_RETRIES = 10
        // Add other environment variables if needed
    }
    
  stages {
    //  stage('Checkout') {
    //         steps {
    //             // Checkout the source code from your GitHub repository
    //             checkout scm
    //         }
    //     }

  stage('Prepare environment'){
      steps {
        dir("${env.WORKSPACE}"){
            sh 'npm cache clean --force'
            sh 'npm install -g npm@8.19.1'
            // sh 'npm ci --fetch-retries 10'
            sh 'mv -f ".env.example" ".env"'
        }
      }
    }
          stage('install dependancies') {
            steps {
                // Install dependencies and build the Node.js app
                sh 'npm install'
            }
        }
      stage('Build') {
            steps {
                // Install dependencies and build the Node.js app
                sh 'npm run build'
            }
        }
     stage('Deploy'){
      steps{
        dir("${env.WORKSPACE}"){
            sh 'cp -r src/public build/'
            sh "scp -r build node_modules root@${BACKEND_SERVER_IP}:/var/www/html/logging/server/"
        }
        sh "ssh root@${BACKEND_SERVER_IP} pm2 restart all"
      }
    }


    // stage('Build'){
    //   steps{
    //     dir("${env.WORKSPACE}/server"){
    //         sh 'npm run build'
    //     }
    //   }
    // }

    // stage('Obfuscate'){
    //   steps{
    //     dir("${env.WORKSPACE}/server"){
    //         sh 'npm run obfuscate'
    //         sh 'cp -r dist/* build/'
    //     }
    //   }
    // }


  }
}
