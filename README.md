# Vividness(AI기반 색상 팔레트 생성 서비스)

**사이트**: [Vividness](https://www.vividness.co/)

**개발 기간** : 24.12.14 ~ 24.12.15

**개발 인원** : 1인

- FrontEnd:

![Vue3](https://img.shields.io/badge/Vue3-4FC08D?style=flat&logo=vuedotjs&logoColor=white)
![Javascript](https://img.shields.io/badge/Javascript-F7DF1E?style=flat&logo=javascript&logoColor=white)

- BackEnd:

![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=flat&logo=springboot&logoColor=white)
![Gradle](https://img.shields.io/badge/Gradle-02303A?style=flat&logo=gradle&logoColor=white)
![Java_17](https://img.shields.io/badge/Java_17-000000?style=flat&logo=openjdk&logoColor=white)

- DB:

![MariaDB](https://img.shields.io/badge/MariaDB-003545?style=flat&logo=mariadb&logoColor=white)

- Deployment:

![AWS_Certificate_Manager](https://img.shields.io/badge/AWS_Certificate_Manager-e84845?style=flat&logo=awscertificatemanager&logoColor=white)
![Amazon_Elastic_Beanstalk](https://img.shields.io/badge/Amazon_Elastic_Beanstalk-e66d00?style=flat&logo=amazonelasticbeanstalk&logoColor=white)
![Amazon_Load_Balancer](https://img.shields.io/badge/Amazon_Load_Balancer-ed8134?style=flat&logo=amazonloadbalancer&logoColor=white) 
![Amazon_EC2](https://img.shields.io/badge/Amazon_EC2-FF9900?style=flat&logo=amazonec2&logoColor=white)

![Github Actions](https://img.shields.io/badge/Github_Actions-2088FF?style=flat&logo=githubactions&logoColor=white)
![Amazon_VPC](https://img.shields.io/badge/Amazon_VPC-5e33b6?style=flat&logo=amazonvpc&logoColor=white)
![Amazon Route 53](https://img.shields.io/badge/Route_53-8C4FFF?style=flat&logo=amazonroute53&logoColor=white) 


---

**23.12.27**

* 원본 사진을 볼 수 있는 Modal 업데이트

**23.12.28**

* Modal 나가기 트리거를 버튼에서 화면 클릭으로 변경
* Gallery 상단 메뉴 바 업데이트
* 사진 업로드 용량 제한 10MB로 변경

**23.12.31**

* 사진 여러 개 업로드 가능하게 변경
* 사진 업로드 용량 제한 최대 50MB로 변경
* 사진 이름에 한글이 있을 경우 S3 삭제 안되던 버그 수정
* 업로드 페이지 로딩 화면 업데이트

**24.01.16**

* Axios를 그만 보내도 되는 경우, 백에서 isEnd를 false에서 true로 수정해 프론트로 보내주도록 변경

**24.03.27**

* 사진 업로드 드래그 앤 드롭으로도 가능하게 변경(사진 한번에 최대 6개, 용량 제한은 그대로)
