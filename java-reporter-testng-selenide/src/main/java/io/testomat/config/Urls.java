package io.testomat.config;

public final class Urls {

    public static final String BASE_URL = "https://www.saucedemo.com/";
    public static final String INVENTORY_URL = BASE_URL + "inventory.html";
    private static final String INVENTORY_ITEM_PATTERN = BASE_URL + INVENTORY_URL + "?id=%s";

    private Urls() {
    }

    public static String inventoryItemUrl(int id) {
        return String.format(INVENTORY_ITEM_PATTERN, id);
    }
}