"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Chip,
  Input,
  Switch,
} from "@heroui/react";
import { motion } from "framer-motion";
import {
  getServicesAction,
  toggleServiceStatusAction,
} from "@/client/actions/service-actions";

export function ServicesManagement() {
  const [services, setServices] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadServices = async () => {
      try {
        const result = await getServicesAction({
          page: 1,
          limit: 100,
          search: "",
          category: "",
          isActive: undefined,
        });
        if (result.success && "services" in result) {
          setServices(result.services);
        }
      } catch (error) {
        console.error("Error loading services:", error);
        // Set empty array on error
        setServices([]);
      } finally {
        setIsLoading(false);
      }
    };
    loadServices();
  }, []);

  const filteredServices = services.filter(
    (service) =>
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">จัดการบริการ</h1>
        <p className="text-gray-600">จัดการบริการทั้งหมดในระบบ</p>
      </motion.div>

      {/* Search and Add */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <Input
          placeholder="ค้นหาบริการ..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-xs"
          variant="bordered"
        />
        <Button color="primary" className="btn-primary">
          + เพิ่มบริการใหม่
        </Button>
      </motion.div>

      {/* Services Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredServices.map((service) => (
          <Card key={service.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{service.name}</h3>
                <Switch
                  isSelected={service.isActive}
                  onValueChange={async () => {
                    try {
                      await toggleServiceStatusAction(service.id);
                      // Reload services
                      const result = await getServicesAction({
                        page: 1,
                        limit: 100,
                        search: "",
                        category: "",
                        isActive: undefined,
                      });
                      if (result.success && "services" in result) {
                        setServices(result.services);
                      }
                    } catch (error) {
                      console.error("Error toggling service status:", error);
                    }
                  }}
                  color="success"
                />
              </div>
              <Chip size="sm" variant="flat" color="primary">
                {service.category}
              </Chip>
            </CardHeader>
            <CardBody className="pt-0">
              <p className="text-gray-600 mb-4">{service.description}</p>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">ระยะเวลา:</span>
                  <span className="text-sm font-medium">
                    {service.duration} นาที
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">ราคา:</span>
                  <span className="text-lg font-bold text-pink-600">
                    {service.price}
                  </span>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button
                  size="sm"
                  variant="bordered"
                  color="primary"
                  className="flex-1"
                >
                  แก้ไข
                </Button>
                <Button
                  size="sm"
                  variant="bordered"
                  color="danger"
                  className="flex-1"
                >
                  ลบ
                </Button>
              </div>
            </CardBody>
          </Card>
        ))}
      </motion.div>
    </div>
  );
}
