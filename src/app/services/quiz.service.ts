import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Quiz } from '../models/quiz.model';
import { Question } from '../models/question.model';
import { Answer } from '../models/answer.model';
import { AnswerType } from '../models/answer-type.enum';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private quizze: Quiz = {
    "id": 1,
    "title": "Technical Proficiency Quiz",
    "description": "A quiz focused on deep technical concepts related to software development, automation, and database management.",
    "questions": [
      {
        "id": 1,
        "questionText": "Explain the concept of thread safety in Java and provide an example of a thread-safe data structure.",
        "type": AnswerType.SINGLE,
        "explanation": "Thread safety ensures that shared data is accessed by multiple threads without leading to data inconsistency. An example of a thread-safe data structure is ConcurrentHashMap, which allows concurrent access and modifications without locking the entire map.",
        "answers": [
          {
            "id": 2,
            "text": "Thread safety is irrelevant in single-threaded applications.",
            "isCorrect": false
          },
          {
            "id": 1,
            "text": "Thread safety ensures consistent access to shared data across multiple threads.",
            "isCorrect": true
          }
        ],
      },
      {
        "id": 2,
        "questionText": "What are design patterns, and why are they important in software development?",
        "type": AnswerType.SINGLE,
        "explanation": "Design patterns are reusable solutions to common software design problems. They help improve code maintainability and scalability by providing proven templates for solving recurring issues.",
        "answers": [
          {
            "id": 3,
            "text": "Design patterns provide common solutions to common problems, improving code structure.",
            "isCorrect": true
          },
          {
            "id": 4,
            "text": "Design patterns are only applicable in object-oriented programming.",
            "isCorrect": false
          }
        ],
      },
      {
        "id": 3,
        "questionText": "Describe how you would implement CI/CD for a Java application using Jenkins and Docker.",
        "type": AnswerType.SINGLE,
        "explanation": "CI/CD for a Java application can be implemented by configuring Jenkins to build the application using Maven, running automated tests, and then creating a Docker image to deploy the application in a containerized environment.",
        "answers": [
          {
            "id": 5,
            "text": "Jenkins builds the application, runs tests, and deploys as a Docker container.",
            "isCorrect": true
          },
          {
            "id": 6,
            "text": "CI/CD is irrelevant for Java applications.",
            "isCorrect": false
          }
        ],
      },
      {
        "id": 4,
        "questionText": "What is the role of Apache Kafka in event streaming, and how do you ensure message delivery guarantees?",
        "type": AnswerType.SINGLE,
        "explanation": "Apache Kafka acts as a distributed event streaming platform that allows for the production, storage, and consumption of streams of records. Message delivery guarantees can be ensured using acknowledgments, replication, and configuring the topic's retention policy.",
        "answers": [
          {
            "id": 8,
            "text": "Kafka does not provide any guarantees for message delivery.",
            "isCorrect": false
          },
          {
            "id": 7,
            "text": "Apache Kafka ensures reliable message delivery through replication and acknowledgments.",
            "isCorrect": true
          }
        ],
      },
      {
        "id": 5,
        "questionText": "Compare and contrast relational and NoSQL databases, including scenarios where each would be preferred.",
        "type": AnswerType.MULTIPLE,
        "explanation": "Relational databases are structured and use SQL for querying, suitable for complex queries and transactions. NoSQL databases are unstructured, designed for scalability and flexibility, often used in big data and real-time applications.",
        "answers": [
          {
            "id": 9,
            "text": "Relational databases are better for structured data and complex queries.",
            "isCorrect": true
          },
          {
            "id": 11,
            "text": "Relational databases are not suitable for transaction management.",
            "isCorrect": false
          },
          {
            "id": 10,
            "text": "NoSQL databases are preferred for big data applications and scalability.",
            "isCorrect": true
          }
        ],
      },
      {
        "id": 6,
        "questionText": "What is a Kubernetes pod, and how does it differ from a container?",
        "type": AnswerType.SINGLE,
        "explanation": "A Kubernetes pod is the smallest deployable unit in Kubernetes, which can contain one or more containers that share storage and network resources. Pods enable better management and scaling of containerized applications compared to using containers alone.",
        "answers": [
          {
            "id": 13,
            "text": "A pod is just another term for a single container.",
            "isCorrect": false
          },
          {
            "id": 12,
            "text": "A pod can contain multiple containers that share resources.",
            "isCorrect": true
          }
        ],
      },
      {
        "id": 7,
        "questionText": "How would you implement automation for deploying microservices in a Kubernetes environment?",
        "type": AnswerType.SINGLE,
        "explanation": "Automation can be implemented using Helm charts for packaging and deploying applications, along with CI/CD tools like Jenkins to trigger deployments based on code changes or scheduled intervals.",
        "answers": [
          {
            "id": 14,
            "text": "Using Helm charts and CI/CD tools to automate deployments in Kubernetes.",
            "isCorrect": true
          },
          {
            "id": 15,
            "text": "Manual deployment is sufficient for microservices in Kubernetes.",
            "isCorrect": false
          }
        ],
      },
      {
        "id": 8,
        "questionText": "Discuss the challenges of implementing CI/CD pipelines and how to overcome them with tools like Jenkins and Maven.",
        "type": AnswerType.MULTIPLE,
        "explanation": "Challenges include integration issues, dependency management, and environment consistency. These can be overcome by using Jenkins for automation, Maven for dependency management, and Docker for consistent environments.",
        "answers": [
          {
            "id": 18,
            "text": "Jenkins does not support environment management.",
            "isCorrect": false
          },
          {
            "id": 16,
            "text": "Integration issues can be solved by using Jenkins for automation.",
            "isCorrect": true
          },
          {
            "id": 17,
            "text": "Dependency management is best handled by using Maven.",
            "isCorrect": true
          }
        ],
      }
    ]
  };

  constructor(private http: HttpClient) {}

  private apiUrl = 'http://localhost:8080/api/v1/quizzes';

  getQuizzeDummy(): Observable<Quiz> {
    return of(this.miniQuiz);
  }

  getQuizzeMiniDummy(): Observable<Quiz> {
    return of(this.miniQuiz);
  }

  getQuizByMission(missionDescription: string): Observable<Quiz> {
    return this.http.post<Quiz>(`${this.apiUrl}/generate-by-mission`, { missionDescription });
  }

  private miniQuiz: Quiz = {
    "id": 1,
    "title": "Technical Proficiency Quiz",
    "description": "A quiz focused on deep technical concepts related to software development, automation, and database management.",
    "questions": [
      {
        "id": 1,
        "questionText": "Explain the concept of thread safety in Java and provide an example of a thread-safe data structure.",
        "type": AnswerType.SINGLE,
        "explanation": "Thread safety ensures that shared data is accessed by multiple threads without leading to data inconsistency. An example of a thread-safe data structure is ConcurrentHashMap, which allows concurrent access and modifications without locking the entire map.",
        "answers": [
          {
            "id": 2,
            "text": "Thread safety is irrelevant in single-threaded applications.",
            "isCorrect": false
          },
          {
            "id": 1,
            "text": "Thread safety ensures consistent access to shared data across multiple threads.",
            "isCorrect": true
          }
        ],
      },
      {
        "id": 2,
        "questionText": "What are design patterns, and why are they important in software development?",
        "type": AnswerType.SINGLE,
        "explanation": "Design patterns are reusable solutions to common software design problems. They help improve code maintainability and scalability by providing proven templates for solving recurring issues.",
        "answers": [
          {
            "id": 3,
            "text": "Design patterns provide common solutions to common problems, improving code structure.",
            "isCorrect": true
          },
          {
            "id": 4,
            "text": "Design patterns are only applicable in object-oriented programming.",
            "isCorrect": false
          }
        ],
      }
    ]
  };


}