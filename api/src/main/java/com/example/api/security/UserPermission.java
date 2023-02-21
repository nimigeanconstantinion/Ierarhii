package com.example.api.security;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public enum UserPermission {
    TREE_READ("persoane:read"),
    TREE_WRITE("persoane:write");

    private String permission;
    public String getPermission(){ return permission;}
}
