package com.ejemplo.app.service;

import com.ejemplo.app.model.Item;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class ItemService {
    private final ObjectMapper om;

    @Value("${app.data.path:backend/data/items.json}")
    private String path;

    public ItemService(ObjectMapper om) {
        this.om = om;
    }

    public List<Item> getStudents() throws IOException {
        return readItems();
    }

    public Item createStudent(Item payload) throws IOException {
        List<Item> items = new ArrayList<>(readItems());

        long nextId = items.stream()
                .map(Item::getId)
                .filter(id -> id != null)
                .mapToLong(Number::longValue)
                .max()
                .orElse(0L) + 1;

        Item created = new Item(nextId, payload.getNombre(), payload.getGrupo());
        items.add(created);

        writeItems(items);
        return created;
    }

    private List<Item> readItems() throws IOException {
        Path p = Path.of(path);

        if (!Files.exists(p) || Files.size(p) == 0) {
            return new ArrayList<>();
        }

        return om.readValue(p.toFile(), new TypeReference<List<Item>>() {});
    }

    private void writeItems(List<Item> items) throws IOException {
        Path p = Path.of(path);
        om.writerWithDefaultPrettyPrinter().writeValue(p.toFile(), items);
    }
}