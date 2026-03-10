package com.ejemplo.app.controller;

import com.ejemplo.app.model.Item;
import com.ejemplo.app.service.ItemService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@RestController
@RequestMapping("/api/items")
public class ItemController {
    private final ItemService is;

    public ItemController(ItemService is) { this.is = is; }

    @GetMapping
    public ResponseEntity<List<Item>> getItems() throws IOException {
        List<Item> foundItems = is.getStudents();
        if (foundItems == null) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(foundItems);
        }
    }

    @PostMapping
    public ResponseEntity<Item> createItem(@RequestBody Item payload)
            throws IOException, URISyntaxException {
        Item createdItem = is.createStudent(payload);

        if (createdItem == null) {
            return ResponseEntity.notFound().build();
        }

        URI uri = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(createdItem.getId())
                .toUri();

        return ResponseEntity.created(uri).body(createdItem);
    }
}