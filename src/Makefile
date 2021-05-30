dkup:
	docker-compose up --build

dkupNR:
	docker-compose up --no-recreate

dkdw:
	docker-compose down --rmi local

data_m_dw:
	docker container stop datamanager
	docker container rm datamanager
	docker image rm src_datamanager

action_m_dw:
	docker container stop actionmanager
	docker container rm actionmanager
	docker image rm src_actionmanager

resource_m_dw:
	docker container stop resourcemanager
	docker container rm resourcemanager
	docker image rm src_resourcemanager

cataloger_m_dw:
	docker container stop servicecataloger
	docker container rm servicecataloger
	docker image rm src_servicecataloger