pipeline {
    agent any

    options {
        buildDiscarder(logRotator(numToKeepStr: '30', artifactNumToKeepStr: '30'))
    }

    environment {
        EMAIL_TO = "it2021091@hua.gr"
        DOCKER_TOKEN = credentials('package-writting-token')
        DOCKER_USER = 'panayiotisperdios'
        DOCKER_SERVER = 'ghcr.io'
        DOCKER_PREFIX = 'ghcr.io/panayiotisperdios/blood-donor-frontend'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'git@github.com:PanayiotisPerdios/blood-donor-app-frontend.git'
            }
        }

        stage('Docker build and push') {
            steps {
                sh '''
                    HEAD_COMMIT=$(git rev-parse --short HEAD)
                    TAG=$HEAD_COMMIT-$BUILD_ID
                    docker build --rm -t $DOCKER_PREFIX:$TAG -t $DOCKER_PREFIX:latest  -f Dockerfile .
                    echo $DOCKER_TOKEN | docker login $DOCKER_SERVER -u $DOCKER_USER --password-stdin
                    docker push $DOCKER_PREFIX --all-tags
                '''
            }
        }
        stage('deploy to k8s') {
            steps {
                sh '''
                    HEAD_COMMIT=$(git rev-parse --short HEAD)
                    TAG=$HEAD_COMMIT-$BUILD_ID
                    # if we had multiple configurations in kubeconfig file, we should select the correct one
                    # kubectl config use-context devops
                    kubectl set image deployment/vuejs-deployment spring=$DOCKER_PREFIX:$TAG
                    kubectl rollout status deployment vuejs-deployment --watch --timeout=2m
                '''
            }
        }



    }


}