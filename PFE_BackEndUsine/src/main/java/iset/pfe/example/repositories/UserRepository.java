package iset.pfe.example.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import iset.pfe.example.entities.User;

public interface UserRepository extends JpaRepository<User,Integer>{

}
