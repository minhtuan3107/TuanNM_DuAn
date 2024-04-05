package com.example.backendglasses.config;

import java.util.Stack;

public class Main {
    public static void main(String[] args) {
        try {
            Stack<Integer> stack = new Stack<>(); // khởi tạo stack
            stack.setSize(2);// set size cho stack
            stack.set(0, (1)); // set giá trị cho stack
            System.out.println(stack);// in ra stack
            stack.set(1, (2));// set giá trị cho stack
            System.out.println(stack);// in ra stack
            stack.set(2, (3)); // set giá trị cho stack
            System.out.println(stack); // in ra stack
        } catch (Exception e) {
            System.out.println(e.getMessage()); // in ra lỗi
        }
    }
}
