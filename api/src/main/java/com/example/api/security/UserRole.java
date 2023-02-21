package com.example.api.security;


import com.google.common.collect.Sets;
import lombok.AllArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Set;
import java.util.stream.Collectors;
import static com.example.api.security.UserPermission.TREE_READ;
import static com.example.api.security.UserPermission.TREE_WRITE;


@AllArgsConstructor
public enum UserRole {
    //am adaugat guava ca dependenta pentru Sets
    USER(Sets.newHashSet(TREE_READ, TREE_WRITE));

    private final Set<UserPermission> permissions;

    public Set<UserPermission> getPermissions() {
        return permissions;
    }

    public Set<SimpleGrantedAuthority> getGrantedAuthorities() {
        Set<SimpleGrantedAuthority> collect = getPermissions()
                .stream()
                .map(e -> new SimpleGrantedAuthority(e.getPermission()))
                .collect(Collectors.toSet());

        collect.add(new SimpleGrantedAuthority("ROLE_" + this.name()));
        return collect;
    }
}
