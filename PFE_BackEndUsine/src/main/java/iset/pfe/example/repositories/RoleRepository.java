package iset.pfe.example.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import iset.pfe.example.entities.Role;

public interface RoleRepository extends JpaRepository<Role,Integer>{
}
