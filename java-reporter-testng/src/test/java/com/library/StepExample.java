package com.library;

import io.testomat.core.annotation.Step;

public class StepExample {

    @Step
    public static void print() {
        System.out.println("STEP TEST");
    }

    @Step("Step example with no args substitution")
    public static void stepExample() throws InterruptedException {
        Thread.sleep(500);
        System.out.println("Example step");
    }

    @Step("Args substitution. Arg1 = {a}, Arg2 = {b}")
    public static int stepExample1(int a, int b) throws InterruptedException {
        Thread.sleep(15000);
        return 2+2;
    }

    @Step
    public static String stepExample2() {
        return "Random-" + System.currentTimeMillis();
    }

    @Step
    public static void stepExample3() {
        int result = 42 * 17 + 256;
        System.out.println("Calculation result: " + result);
    }

    @Step
    public static boolean stepExample4() throws InterruptedException {
        Thread.sleep(300);
        return Math.random() > 0.5;
    }

    @Step
    public static void stepExample5() {
        System.out.println("Logging test message at " + System.currentTimeMillis());
    }

    @Step
    public static int stepExample6() {
        return 7 * 13;
    }

    @Step
    public static void stepExample7() throws InterruptedException {
        Thread.sleep(1000);
        System.out.println("Delay completed");
    }

    @Step
    public static double stepExample8() {
        return (75.0 / 100.0) * 200;
    }

    @Step
    public static String stepExample9() {
        return "Test" + "-" + "Method" + "-" + "Step";
    }

    @Step
    public static void stepExample10() {
        int[] numbers = {1, 2, 3, 4, 5};
        for (int num : numbers) {
            System.out.print(num + " ");
        }
        System.out.println();
    }

    @Step
    public static boolean stepExample11() {
        int randomNum = (int) (Math.random() * 100);
        return randomNum % 2 == 0;
    }
}
