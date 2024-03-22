package org.example.be.repository;

import org.example.be.model.Account;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {
    @Query(value ="select * from account where account.is_deleted = 0 and account.role_id = 2 and (account.account_name like :name or account.address like :name )", nativeQuery = true)
    Page<Account> getAccountAndSearch(@Param("name") String name, Pageable pageable);
}
