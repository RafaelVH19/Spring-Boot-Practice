package com.ejemplo.app.model;

public class Item {
    private Number id;
    private String nombre;
    private String grupo;

    public Item() {}
    public Item(Number id, String nombre, String grupo) {
        this.id = id;
        this.nombre = nombre;
        this.grupo = grupo;
    }

    public Number getId() { return id; }
    public void setId(Number id) { this.id = id; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getGrupo() { return grupo; }
    public void setGrupo(String grupo) { this.grupo = grupo; }
}