dkup:
	docker-compose up --build

dkupNR:
	docker-compose up --no-recreate

dkdw:
	docker-compose down --rmi local

data_m_dw:
	docker container rm datamanager
	docker image rm src_datamanager

action_m_dw:
	docker container rm actionmanager
	docker image rm src_actionmanager