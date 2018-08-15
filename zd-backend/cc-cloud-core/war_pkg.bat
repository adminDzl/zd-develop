e:
cd  E:\workspace\cc-cloud-core

@rem ####如果你使用的是maven来管理项目，执行以下命令既可以
@rem ####cd 项目跟目录（和pom.xml同级）
@rem ###     mvn clean package
@rem ##    或者执行下面的命令
@rem ##    排除测试代码后进行打包
@rem ### 打包完成后jar包会生成到target目录下，命名一般是 项目名+版本号.jar
mvn clean package  -Dmaven.test.skip=true -X
